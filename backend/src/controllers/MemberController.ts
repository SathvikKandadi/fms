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
  const { trainerId, sessionId, date, time } = req.body;

  // Convert date and time strings to the appropriate format if necessary
  // const formattedDate = new Date(date).toISOString().split('T')[0]; // Format to YYYY-MM-DD
  // const formattedTime = new Date(`1970-01-01T${time}`).toISOString().split('T')[1].slice(0, 8); // Format to HH:MM:SS

  try {
    const result = await pool.query(
      "INSERT INTO Session ( Date,  Time , Trainer_ID) VALUES ( CURRENT_DATE, CURRENT_TIME, $1) RETURNING *",
      [trainerId] // Use formatted date and time
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

export const makePayment = async (req: Request, res: Response) : Promise<any> => {
  const { memberId } = req.params;
  const { amount, paymentType } = req.body;

  // Validate paymentType
  const validPaymentTypes = ['Membership Fee', 'Session Booking'];
  if (!validPaymentTypes.includes(paymentType)) {
    return res.status(400).json({ error: "Invalid payment type" });
  }

  // Validate amount
  if (!amount || isNaN(amount) || amount <= 0) {
    return res.status(400).json({ error: "Invalid payment amount" });
  }

  try {
    // Insert payment record
    const result = await pool.query(
      "INSERT INTO Payment (Member_ID, Amount, Payment_Date, Payment_Type) VALUES ($1, $2, CURRENT_DATE, $3) RETURNING *",
      [memberId, amount, paymentType]
    );

    res.status(201).json({
      message: "Payment successful",
      data: result.rows[0],
    });
  } catch (error) {
    if (error.code === '23503') {
      // Foreign key violation
      return res.status(400).json({ error: "Member does not exist" });
    }
    res.status(500).json({ error: "An error occurred while processing the payment" });
  }
};

// Make Payment
// export const makePayment = async (req: Request, res: Response) => {
//   const { memberId } = req.params;
//   const { amount, paymentType } = req.body;
//   try {
//     const result = await pool.query(
//       "INSERT INTO Payment (Member_ID, Amount, Payment_Date, Payment_Type) VALUES ($1, $2, CURRENT_DATE, $3) RETURNING *",
//       [memberId, amount, paymentType]
//     );
//     res.status(201).json({ message: "Payment successful", data: result.rows[0] });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
