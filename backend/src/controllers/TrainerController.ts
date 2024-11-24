import { Request, Response } from "express";
import  pool  from "../config/db"; // Assume pool is the PostgreSQL connection pool


//Get Trainer details
export const getTrainerProfileByPhoneNumber = async (req: Request, res: Response) : Promise<any> => {
    const { phonenumber } = req.body;
    try {
      const result = await pool.query(
        "SELECT * FROM Trainer WHERE Contact = $1",
        [phonenumber]
      );
      if (result.rows.length === 0) {
        return res.status(404).json({ message: "Trainer not found" });
      }
      res.status(200).json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
// Get Trainer Schedule
export const getTrainerSchedule = async (req: Request, res: Response) => {
  const { trainerId } = req.params;
  try {
    const result = await pool.query(
      "SELECT * FROM Session WHERE Trainer_ID = $1 ORDER BY Date, Time",
      [trainerId]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Manage Assigned Members
export const getAssignedMembers = async (req: Request, res: Response) => {
  const { trainerId } = req.params;
  try {
    const result = await pool.query(
      `SELECT m.* 
       FROM Member m 
       JOIN Diet_Plan dp ON m.Member_ID = dp.Member_ID 
       WHERE dp.Trainer_ID = $1`,
      [trainerId]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create Workout Log
export const createWorkoutLog = async (req: Request, res: Response) => {
  const { memberId } = req.params;
  const { date, exercise, sets, reps, weight } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO Workout_Log (Member_ID, Date, Exercise, Sets, Reps, Weight) 
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [memberId, date, exercise, sets, reps, weight]
    );
    res.status(201).json({ message: "Workout log created successfully", data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Workout Log
export const updateWorkoutLog = async (req: Request, res: Response) => {
  const { logId } = req.params;
  const { exercise, sets, reps, weight } = req.body;
  try {
    const result = await pool.query(
      `UPDATE Workout_Log 
       SET Exercise = $1, Sets = $2, Reps = $3, Weight = $4 
       WHERE Log_ID = $5 RETURNING *`,
      [exercise, sets, reps, weight, logId]
    );
    res.status(200).json({ message: "Workout log updated successfully", data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Workout Log
export const deleteWorkoutLog = async (req: Request, res: Response) => {
  const { logId } = req.params;
  try {
    await pool.query("DELETE FROM Workout_Log WHERE Log_ID = $1", [logId]);
    res.status(200).json({ message: "Workout log deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create and Assign Diet Plan
export const createDietPlan = async (req: Request, res: Response) => {
  const { trainerId } = req.params;
  const { memberId, planDetails } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO Diet_Plan (Trainer_ID, Member_ID, Plan_Details) 
       VALUES ($1, $2, $3) RETURNING *`,
      [trainerId, memberId, planDetails]
    );
    res.status(201).json({ message: "Diet plan created successfully", data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Edit Diet Plan
export const editDietPlan = async (req: Request, res: Response) => {
  const { planId } = req.params;
  const { planDetails } = req.body;
  try {
    const result = await pool.query(
      `UPDATE Diet_Plan 
       SET Plan_Details = $1 
       WHERE Plan_ID = $2 RETURNING *`,
      [planDetails, planId]
    );
    res.status(200).json({ message: "Diet plan updated successfully", data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Track Member Progress
export const trackMemberProgress = async (req: Request, res: Response) => {
  const { memberId } = req.params;
  try {
    const workoutLogs = await pool.query(
      "SELECT * FROM Workout_Log WHERE Member_ID = $1 ORDER BY Date DESC",
      [memberId]
    );
    const payments = await pool.query(
      "SELECT * FROM Payment WHERE Member_ID = $1 ORDER BY Payment_Date DESC",
      [memberId]
    );
    res.status(200).json({
      workoutLogs: workoutLogs.rows,
      payments: payments.rows,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create Session
export const createSession = async (req: Request, res: Response) => {
  const { trainerId } = req.params;
  const { date, time } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO Session (Date, Time, Trainer_ID) 
       VALUES ($1, $2, $3) RETURNING *`,
      [date, time, trainerId]
    );
    res.status(201).json({ message: "Session created successfully", data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
