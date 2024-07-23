import AbstractModel from "../models/abstract.model.js";
import ResponseError from "../responses/error.response.js";

export default class AbstractService {
  constructor() {
    this.model = AbstractModel;
  }

  createAbstract = async (data) => {
    try {
      return await this.model.create(data);
    } catch (error) {
      throw new ResponseError(error.message, error.code);
    }
  };

  readAbstract = async () => {
    try {
      return await this.model.findMany();
    } catch (error) {
      throw new ResponseError(error.message, error.code);
    }
  };

  updateAbstract = async (id, data) => {
    try {
      return await this.model.update({
        where: {
          id,
        },
        data,
      });
    } catch (error) {
      throw new ResponseError(error.message, error.code);
    }
  };

  deleteAbstract = async (id) => {
    try {
      return await this.model.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new ResponseError(error.message, error.code);
    }
  };

  readAbstractById = async (id) => {
    try {
      return await this.model.findUnique({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new ResponseError(error.message, error.code);
    }
  };

  readAbstractByField = async (field, value) => {
    try {
      return await this.model.findFirst({
        where: {
          [field]: value,
        },
      });
    } catch (error) {
      throw new ResponseError(error.message, error.code);
    }
  };

  readAbstractByFields = async (fields) => {
    try {
      return await this.model.findFirst({
        where: {
          ...fields,
        },
      });
    } catch (error) {
      throw new ResponseError(error.message, error.code);
    }
  };

  searchAbstract = async ({ title, abstract, page, perPage, order, sort }) => {
    try {
      return await this.model.findMany({
        where: {
          OR: [
            {
              title: {
                contains: title,
              },
            },
            {
              abstract: {
                contains: abstract,
              },
            },
          ],
        },
        take: perPage,
        skip: (page - 1) * perPage,
        orderBy: {
          sort: order,
        },
      });
    } catch (error) {
      throw new ResponseError(error.message, error.code);
    }
  };

  readAbstractByUser = async (userId) => {
    try {
      return await this.model.findMany({
        where: {
          authors: {
            some: {
              id: userId,
            },
          },
        },
      });
    } catch (error) {
      throw new ResponseError(error.message, error.code);
    }
  };

  readAbstractByUserAndField = async (userId, field, value) => {
    try {
      return await this.model.findMany({
        where: {
          userId,
          [field]: value,
        },
      });
    } catch (error) {
      throw new ResponseError(error.message, error.code);
    }
  };

  readAbstractByUserAndFields = async (userId, fields) => {
    try {
      return await this.model.findMany({
        where: {
          userId,
          ...fields,
        },
      });
    } catch (error) {
      throw new ResponseError(error.message, error.code);
    }
  };
  countSearchAbstracts = async ({ title, abstract }) => {
    try {
      return await this.model.count({
        where: {
          OR: [
            {
              title: {
                contains: title,
              },
            },
            {
              abstract: {
                contains: abstract,
              },
            },
          ],
        },
      });
    } catch (error) {
      throw new ResponseError(error.message, error.code);
    }
  };
}
