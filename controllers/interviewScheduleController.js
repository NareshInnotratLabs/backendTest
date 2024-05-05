import InterviewSchedule from "../models/interviewScheduleModel.js";
import Interview from "../models/interviewScheduleModel.js";
import { z } from 'zod';
import DyteAPI from '../utils/dyte-api.js';

const createMeetingSchema = z.object({
  title: z.string().optional(),
});

const addParticipantSchema = z.object({
  name: z.string(),
  picture: z.string().optional(),
  preset_name: z.string(),
});

export const interviewSchedule =  async (req, res) => {

  try {
    const parseResult = createMeetingSchema.safeParse(req.body);

    if (!parseResult.success) {
      console.log(parseResult.error);
      return res.status(400).json({ success: false, message: 'Bad Request' });
    }

    const { title, name, picture, preset_name, date, time} = req.body;

   

    const response = await DyteAPI.post('/meetings', {
      title,
    });
    // console.log(response.data.data.id)

    const parseResults = addParticipantSchema.safeParse(req.body);

    if (!parseResults.success) {
      console.log(parseResults.error);
      return res.status(400).json({ success: false, message: 'Bad Request' });
    }

    const client_specific_id = `react-samples::${name.replaceAll(
      ' ',
      '-'
    )}-${preset_name.replaceAll(' ', '-')}-${Math.random()
      .toString(36)
      .substring(2, 7)}`;

    const responses = await DyteAPI.post(`/meetings/${response.data.data.id}/participants`, {
      name,
      picture,
      preset_name,
      client_specific_id ,
    });

    const sendDatabase = await Interview.create({
      name,
      picture,
      preset_name,
      date,
      time,
      token:responses.data.token
  });

    return res.status(responses.status).json(responses.data);
  
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }

}


export const selectPresets = async(req, res) => {
  
  try {
    const response = await DyteAPI.get('/presets');

    return res.status(response.status).json(response.data);
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }

}