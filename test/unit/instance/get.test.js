'use strict';

const chai = require('chai');
const sinon = require('sinon');

const expect = chai.expect;
const Support   = require('../support');
const DataTypes = require('sequelize/lib/data-types');

const current   = Support.sequelize;

describe(Support.getTestDialectTeaser('Instance'), () => {
  describe('get', () => {
    beforeEach(function () {
      this.getSpy = sinon.spy();
      this.User = current.define('User', {
        name: {
          type: DataTypes.STRING,
          get: this.getSpy,
        },
      });
    });

    it('invokes getter if raw: false', function () {
      this.User.build().get('name');

      expect(this.getSpy).to.have.been.called;
    });

    it('does not invoke getter if raw: true', function () {
      this.User.build().get('name', { raw: true });

      expect(this.getSpy).not.to.have.been.called;
    });
  });
});
