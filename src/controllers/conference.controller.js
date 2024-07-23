import ConferenceService from "../services/conference.service.js";
import ResponseError from "../responses/error.response.js";
import ResponseApi from "../responses/api.response.js";
import * as validateConference from "../validate/conference.validate.js";

export default class ConferenceController {
  service = new ConferenceService();

  // get all conference and apply pagination
  getConference = async (req, res, next) => {
    try {
      // validate the query parameters
      const { value, error } =
        validateConference.conferenceSearchSchema.validate(req.query);

      if (error) {
        throw new ResponseError(error.message, 400);
      }
      const pagination = {
        page: value.page,
        perPage: value.perPage,
        total: await this.service.countSearchConference(value),
      };
      // call the service
      const conference = await this.service.searchConference(value);
      // send the response
      return ResponseApi.success(res, conference, pagination);
    } catch (error) {
      return next(error);
    }
  };

  // create a new conference by admin
  createConference = async (req, res, next) => {
    try {
      // validate the request body
      const { value, error } =
        validateConference.conferenceCreateSchema.validate(req.body);
      if (error) {
        throw new ResponseError(error.message, 400);
      }
      // call the servic
      const conference = await this.service.createConference(value);
      // send the response
      return ResponseApi.created(res, conference);
    } catch (error) {
      return next(error);
    }
  };

  // update conference by user
  updateConference = async (req, res, next) => {
    try {
      // validate the request body
      const { value, error } =
        validateConference.conferenceUpdateSchema.validate(req.body);
      if (error) {
        throw new ResponseError(error.message, 400);
      }
      // call the service
      const conference = await this.service.updateConference(
        req.params.id,
        value
      );
      // send the response
      return ResponseApi.success(res, conference);
    } catch (error) {
      return next(error);
    }
  };

  // delete conference by user
  deleteConference = async (req, res, next) => {
    try {
      // call the service
      const conference = await this.service.deleteConference(req.params.id);
      // send the response
      return ResponseApi.success(res, conference);
    } catch (error) {
      return next(error);
    }
  };

  // get conference by id
  getConferenceById = async (req, res, next) => {
    try {
      // call the service
      const conference = await this.service.getConferenceById(req.params.id);
      // send the response
      return ResponseApi.success(res, conference);
    } catch (error) {
      return next(error);
    }
  };

  attendConference = async (req, res, next) => {
    try {
      // validate the request body

      if (!req.params.id) {
        throw new ResponseError("Conference id is required", 400);
      }

      if (!req.body.attend) {
        throw new ResponseError("Attend is required", 400);
      }

      // check if user is already attending the conference
      const conference = await this.service.getConferenceById(req.params.id);
      if (conference.attend.includes(req.body.attend)) {
        throw new ResponseError(
          "User is already attending the conference",
          400
        );
      }

      // call the service
      await this.service.attendConference(req.params.id, req.body.attend);
      // send the response

      return ResponseApi.success(res, null);
    } catch (error) {
      return next(error);
    }
  };
  unattendConference = async (req, res, next) => {
    try {
      // validate the request body

      if (!req.params.id) {
        throw new ResponseError("Conference id is required", 400);
      }

      //   check if user is attending the conference
      const conference = await this.service.getConferenceById(req.params.id);

      if (!conference.attend.includes(req.body.attend)) {
        throw new ResponseError("User is not attending the conference", 400);
      }

      await this.service.unattendConference(req.params.id, req.body.attend);
      // call the service
      // send the response
      return ResponseApi.success(res, null);
    } catch (error) {
      return next(error);
    }
  };
}
