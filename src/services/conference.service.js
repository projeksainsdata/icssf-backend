import ConferenceModel from "../models/conference.model.js";
import ResponseError from "../responses/error.response.js";

export default class ConferenceService {
  // create conference service that will handle all conference related logic here

  searchConference = async ({
    page = 1,
    perPage = 10,
    sort = "asc",
    title,
    host,
    status,
    short_name,
    venue,
  }) => {
    try {
      return await ConferenceModel.findMany({
        where: {
          OR: [
            { title: { contains: title } },
            { host: { contains: host } },
            { status: { contains: status } },
            { short_name: { contains: short_name } },
            { venue: { contains: venue } },
          ],
        },
        orderBy: {
          createAt: sort,
        },
        skip: (page - 1) * perPage,
        take: perPage,
      });
    } catch (error) {
      throw new ResponseError(error.message, error.code);
    }
  };
  countSearchConference = async ({
    title,
    host,
    status,
    short_name,
    venue,
  }) => {
    try {
      return await ConferenceModel.count({
        where: {
          OR: [
            { title: { contains: title } },
            { host: { contains: host } },
            { status: { contains: status } },
            { short_name: { contains: short_name } },
            { venue: { contains: venue } },
          ],
        },
      });
    } catch (error) {
      throw new ResponseError(error.message, error.code);
    }
  };

  createConference = async (data) => {
    try {
      return await ConferenceModel.create(data);
    } catch (error) {
      throw new ResponseError(error.message, error.code);
    }
  };

  updateConference = async (id, data) => {
    try {
      return await ConferenceModel.update(id, data);
    } catch (error) {
      throw new ResponseError(error.message, error.code);
    }
  };

  deleteConference = async (id) => {
    try {
      return await ConferenceModel.delete(id);
    } catch (error) {
      throw new ResponseError(error.message, error.code);
    }
  };

  getConferenceById = async (id) => {
    try {
      return await ConferenceModel.findOne(id);
    } catch (error) {
      throw new ResponseError(error.message, error.code);
    }
  };

  attendConference = async (id, userId) => {
    try {
      return await ConferenceModel.updateOne(id, {
        attendees: {
          $push: userId,
        },
      });
    } catch (error) {
      throw new ResponseError(error.message, error.code);
    }
  };

  unAttendConference = async (id, userId) => {
    try {
      return await ConferenceModel.updateOne(id, {
        attendees: {
          $pull: userId,
        },
      });
    } catch (error) {
      throw new ResponseError(error.message, error.code);
    }
  };
}
