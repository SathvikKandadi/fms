import { Request, Response } from "express";
import pool  from "../config/db";

export const test = async (req: Request, res: Response) : Promise<any> => {
    // console.log(pool);
    try{
        const result = await pool.query(
            "SELECT * FROM MEMBER"
        )
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Member not found" });
          }
          res.status(200).json(result.rows);
        //   res.status(200).json({msg:"Hello"});
    }
    catch(error){
        res.status(500).json({ error: error.message });
    }
}
// Get Member Profile
export const getMemberProfile = async (req: Request, res: Response) : Promise<any> => {
  const { memberId } = req.params;
  try {
    const result = await pool.query(
      "SELECT * FROM Member WHERE Member_ID = $1",
      [memberId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Member not found" });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Member Profile by Phone number
export const getMemberProfileByPhoneNumber = async (req: Request, res: Response) : Promise<any> => {
    const { phonenumber } = req.body;
    try {
      const result = await pool.query(
        "SELECT * FROM Member WHERE Phone = $1",
        [phonenumber]
      );
      if (result.rows.length === 0) {
        return res.status(404).json({ message: "Member not found" });
      }
      res.status(200).json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

// Book a Fitness Session
export const bookSession = async (req: Request, res: Response) => {
  const { memberId } = req.params;
  const { sessionId } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO Member_Sessions (Member_ID, Session_ID) VALUES ($1, $2) RETURNING *",
      [memberId, sessionId]
    );
    res.status(201).json({ message: "Session booked successfully", data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Workout Logs
export const getWorkoutLogs = async (req: Request, res: Response) => {
  const { memberId } = req.params;
  try {
    const result = await pool.query(
      "SELECT * FROM Workout_Log WHERE Member_ID = $1 ORDER BY Date DESC",
      [memberId]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Diet Plan
export const getDietPlan = async (req: Request, res: Response) => {
  const { memberId } = req.params;
  try {
    const result = await pool.query(
      "SELECT * FROM Diet_Plan WHERE Member_ID = $1",
      [memberId]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Make Payment
export const makePayment = async (req: Request, res: Response) => {
  const { memberId } = req.params;
  const { amount, paymentType } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO Payment (Member_ID, Amount, Payment_Date, Payment_Type) VALUES ($1, $2, CURRENT_DATE, $3) RETURNING *",
      [memberId, amount, paymentType]
    );
    res.status(201).json({ message: "Payment successful", data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
