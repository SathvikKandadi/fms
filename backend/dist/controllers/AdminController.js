"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateReport = exports.getPaymentHistory = exports.deleteTrainer = exports.updateTrainer = exports.addTrainer = exports.deleteMember = exports.updateMember = exports.addMember = void 0;
const db_1 = __importDefault(require("../config/db")); // PostgreSQL connection pool
// Add a New Member
const addMember = async (req, res) => {
    const { name, address, phone, email, membershipStatus } = req.body;
    try {
        const result = await db_1.default.query(`INSERT INTO Member (Name, Address, Phone, Email, Membership_Status) 
       VALUES ($1, $2, $3, $4, $5) RETURNING *`, [name, address, phone, email, membershipStatus || "Active"]);
        res.status(201).json({ message: "Member added successfully", data: result.rows[0] });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.addMember = addMember;
// Update Member Details
const updateMember = async (req, res) => {
    const { memberId } = req.params;
    const { name, address, phone, email, membershipStatus } = req.body;
    try {
        const result = await db_1.default.query(`UPDATE Member 
       SET Name = $1, Address = $2, Phone = $3, Email = $4, Membership_Status = $5 
       WHERE Member_ID = $6 RETURNING *`, [name, address, phone, email, membershipStatus, memberId]);
        res.status(200).json({ message: "Member details updated successfully", data: result.rows[0] });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.updateMember = updateMember;
// Delete a Member
const deleteMember = async (req, res) => {
    const { memberId } = req.params;
    try {
        await db_1.default.query("DELETE FROM Member WHERE Member_ID = $1", [memberId]);
        res.status(200).json({ message: "Member deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.deleteMember = deleteMember;
// Add a New Trainer
const addTrainer = async (req, res) => {
    const { name, specialty, contact } = req.body;
    try {
        const result = await db_1.default.query(`INSERT INTO Trainer (Name, Specialty, Contact) 
       VALUES ($1, $2, $3) RETURNING *`, [name, specialty, contact]);
        res.status(201).json({ message: "Trainer added successfully", data: result.rows[0] });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.addTrainer = addTrainer;
// Update Trainer Details
const updateTrainer = async (req, res) => {
    const { trainerId } = req.params;
    const { name, specialty, contact } = req.body;
    try {
        const result = await db_1.default.query(`UPDATE Trainer 
       SET Name = $1, Specialty = $2, Contact = $3 
       WHERE Trainer_ID = $4 RETURNING *`, [name, specialty, contact, trainerId]);
        res.status(200).json({ message: "Trainer details updated successfully", data: result.rows[0] });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.updateTrainer = updateTrainer;
// Delete a Trainer
const deleteTrainer = async (req, res) => {
    const { trainerId } = req.params;
    try {
        await db_1.default.query("DELETE FROM Trainer WHERE Trainer_ID = $1", [trainerId]);
        res.status(200).json({ message: "Trainer deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.deleteTrainer = deleteTrainer;
// Get Payment History
const getPaymentHistory = async (req, res) => {
    try {
        const result = await db_1.default.query(`SELECT p.*, m.Name AS Member_Name 
       FROM Payment p 
       JOIN Member m ON p.Member_ID = m.Member_ID 
       ORDER BY Payment_Date DESC`);
        res.status(200).json(result.rows);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getPaymentHistory = getPaymentHistory;
// Generate Reports
const generateReport = async (req, res) => {
    try {
        const memberCount = await db_1.default.query("SELECT COUNT(*) AS total_members FROM Member");
        const trainerCount = await db_1.default.query("SELECT COUNT(*) AS total_trainers FROM Trainer");
        const payments = await db_1.default.query(`SELECT SUM(Amount) AS total_revenue 
       FROM Payment`);
        res.status(200).json({
            members: memberCount.rows[0].total_members,
            trainers: trainerCount.rows[0].total_trainers,
            revenue: payments.rows[0].total_revenue,
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.generateReport = generateReport;
