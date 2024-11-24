import { Request, Response } from "express";
import  pool  from "../config/db"; // PostgreSQL connection pool

// Add a New Member
export const addMember = async (req: Request, res: Response) => {
  const { name, address, phone, email, membershipStatus } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO Member (Name, Address, Phone, Email, Membership_Status) 
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [name, address, phone, email, membershipStatus || "Active"]
    );
    res.status(201).json({ message: "Member added successfully", data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Member Details
export const updateMember = async (req: Request, res: Response) => {
  const { memberId } = req.params;
  const { name, address, phone, email, membershipStatus } = req.body;
  try {
    const result = await pool.query(
      `UPDATE Member 
       SET Name = $1, Address = $2, Phone = $3, Email = $4, Membership_Status = $5 
       WHERE Member_ID = $6 RETURNING *`,
      [name, address, phone, email, membershipStatus, memberId]
    );
    res.status(200).json({ message: "Member details updated successfully", data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a Member
export const deleteMember = async (req: Request, res: Response) => {
  const { memberId } = req.params;
  try {
    await pool.query("DELETE FROM Member WHERE Member_ID = $1", [memberId]);
    res.status(200).json({ message: "Member deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add a New Trainer
export const addTrainer = async (req: Request, res: Response) => {
  const { name, specialty, contact } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO Trainer (Name, Specialty, Contact) 
       VALUES ($1, $2, $3) RETURNING *`,
      [name, specialty, contact]
    );
    res.status(201).json({ message: "Trainer added successfully", data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Trainer Details
export const updateTrainer = async (req: Request, res: Response) => {
  const { trainerId } = req.params;
  const { name, specialty, contact } = req.body;
  try {
    const result = await pool.query(
      `UPDATE Trainer 
       SET Name = $1, Specialty = $2, Contact = $3 
       WHERE Trainer_ID = $4 RETURNING *`,
      [name, specialty, contact, trainerId]
    );
    res.status(200).json({ message: "Trainer details updated successfully", data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a Trainer
export const deleteTrainer = async (req: Request, res: Response) => {
  const { trainerId } = req.params;
  try {
    await pool.query("DELETE FROM Trainer WHERE Trainer_ID = $1", [trainerId]);
    res.status(200).json({ message: "Trainer deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Payment History
export const getPaymentHistory = async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      `SELECT p.*, m.Name AS Member_Name 
       FROM Payment p 
       JOIN Member m ON p.Member_ID = m.Member_ID 
       ORDER BY Payment_Date DESC`
    );
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Generate Reports
export const generateReport = async (req: Request, res: Response) => {
  try {
    const memberCount = await pool.query("SELECT COUNT(*) AS total_members FROM Member");
    const trainerCount = await pool.query("SELECT COUNT(*) AS total_trainers FROM Trainer");
    const payments = await pool.query(
      `SELECT SUM(Amount) AS total_revenue 
       FROM Payment`
    );

    res.status(200).json({
      members: memberCount.rows[0].total_members,
      trainers: trainerCount.rows[0].total_trainers,
      revenue: payments.rows[0].total_revenue,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
