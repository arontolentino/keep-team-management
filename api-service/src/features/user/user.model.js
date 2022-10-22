const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Model } = require('objection');
const knex = require('../../config/knex');
const ApiError = require('../../utils/ApiError');

Model.knex(knex);

class User extends Model {
  static get tableName() {
    return 'users';
  }

  static get idColumn() {
    return 'userId';
  }

  static get modifiers() {
    return {
      defaultSelects(builder) {
        builder.select(['userId', 'businessId', 'password', 'name', 'email']);
      },
    };
  }

  static get relationMappings() {
    const { Token } = require('../token');
    const { Card } = require('../card');
    const { Role } = require('../role');

    return {
      tokens: {
        relation: Model.HasManyRelation,
        modelClass: Token,
        join: {
          from: 'users.userId',
          to: 'tokens.userId',
        },
      },
      cards: {
        relation: Model.HasManyRelation,
        modelClass: Card,
        join: {
          from: 'users.userId',
          to: 'cards.userId',
        },
      },
      role: {
        relation: Model.HasOneRelation,
        modelClass: Role,
        join: {
          from: 'users.roleId',
          to: 'roles.roleId',
        },
      },
    };
  }

  $formatJson(json) {
    json = super.$formatJson(json);
    delete json.password;
    return json;
  }

  /**
   * Check if email is taken
   * @param {string} email - The user's email
   * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
   * @returns {Promise<boolean>}
   */
  async isEmailTaken(email, excludeUserId) {
    let user;

    if (excludeUserId) {
      user = await this.constructor
        .query()
        .findOne({ email })
        .whereNot('userId', excludeUserId);
    } else {
      user = await this.constructor.query().findOne({ email });
    }

    return !!user;
  }

  /**
   * Encrypts password into hash
   * @param {string} password
   * @returns {string}
   */
  async encryptPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  /**
   * Check if password matches the user's password
   * @param {string} password
   * @returns {Promise<boolean>}
   */
  async isPasswordMatch(password) {
    return await bcrypt.compare(password, this.password);
  }

  async $beforeInsert() {
    // Check if email exists
    if (await this.isEmailTaken(this.email)) {
      throw new ApiError(400, 'Email already taken.');
    }

    if (this.password) {
      this.password = await this.encryptPassword(this.password);
    }
  }

  async $beforeUpdate() {
    if (this.email && (await this.isEmailTaken(this.email))) {
      throw new ApiError(400, 'Email already taken.');
    }

    // Check if password is being updated
    if (this.password) {
      this.password = await this.encryptPassword(this.password);
    }
  }
}

module.exports = User;
