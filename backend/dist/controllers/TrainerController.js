"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSession = exports.trackMemberProgress = exports.editDietPlan = exports.createDietPlan = exports.deleteWorkoutLog = exports.updateWorkoutLog = exports.createWorkoutLog = exports.getAssignedMembers = exports.getTrainerSchedule = exports.getTrainerProfileByPhoneNumber = void 0;
const db_1 = __importDefault(require("../config/db")); // Assume pool is the PostgreSQL connection pool
//Get Trainer details
const getTrainerProfileByPhoneNumber = async (req, res) => {
    const { phonenumber } = req.body;
    try {
        const result = await db_1.default.query("SELECT * FROM Trainer WHERE Contact = $1", [phonenumber]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Trainer not found" });
        }
        res.status(200).json(result.rows[0]);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getTrainerProfileByPhoneNumber = getTrainerProfileByPhoneNumber;
// Get Trainer Schedule
const getTrainerSchedule = async (req, res) => {
    const { trainerId } = req.params;
    try {
        const result = await db_1.default.query("SELECT * FROM Session WHERE Trainer_ID = $1 ORDER BY Date, Time", [trainerId]);
        res.status(200).json(result.rows);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getTrainerSchedule = getTrainerSchedule;
// Manage Assigned Members
const getAssignedMembers = async (req, res) => {
    const { trainerId } = req.params;
    try {
        const result = await db_1.default.query(`SELECT m.* 
       FROM Member m 
       JOIN Diet_Plan dp ON m.Member_ID = dp.Member_ID 
       WHERE dp.Trainer_ID = $1`, [trainerId]);
        res.status(200).json(result.rows);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getAssignedMembers = getAssignedMembers;
// Create Workout Log
const createWorkoutLog = async (req, res) => {
    const { memberId } = req.params;
    const { date, exercise, sets, reps, weight } = req.body;
    try {
        const result = await db_1.default.query(`INSERT INTO Workout_Log (Member_ID, Date, Exercise, Sets, Reps, Weight) 
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`, [memberId, date, exercise, sets, reps, weight]);
        res.status(201).json({ message: "Workout log created successfully", data: result.rows[0] });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.createWorkoutLog = createWorkoutLog;
// Update Workout Log
const updateWorkoutLog = async (req, res) => {
    const { logId } = req.params;
    const { exercise, sets, reps, weight } = req.body;
    try {
        const result = await db_1.default.query(`UPDATE Workout_Log 
       SET Exercise = $1, Sets = $2, Reps = $3, Weight = $4 
       WHERE Log_ID = $5 RETURNING *`, [exercise, sets, reps, weight, logId]);
        res.status(200).json({ message: "Workout log updated successfully", data: result.rows[0] });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.updateWorkoutLog = updateWorkoutLog;
// Delete Workout Log
const deleteWorkoutLog = async (req, res) => {
    const { logId } = req.params;
    try {
        await db_1.default.query("DELETE FROM Workout_Log WHERE Log_ID = $1", [logId]);
        res.status(200).json({ message: "Workout log deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.deleteWorkoutLog = deleteWorkoutLog;
// Create and Assign Diet Plan
const createDietPlan = async (req, res) => {
    const { trainerId } = req.params;
    const { memberId, planDetails } = req.body;
    try {
        const result = await db_1.default.query(`INSERT INTO Diet_Plan (Trainer_ID, Member_ID, Plan_Details) 
       VALUES ($1, $2, $3) RETURNING *`, [trainerId, memberId, planDetails]);
        res.status(201).json({ message: "Diet plan created successfully", data: result.rows[0] });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.createDietPlan = createDietPlan;
// Edit Diet Plan
const editDietPlan = async (req, res) => {
    const { planId } = req.params;
    const { planDetails } = req.body;
    try {
        const result = await db_1.default.query(`UPDATE Diet_Plan 
       SET Plan_Details = $1 
       WHERE Plan_ID = $2 RETURNING *`, [planDetails, planId]);
        res.status(200).json({ message: "Diet plan updated successfully", data: result.rows[0] });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.editDietPlan = editDietPlan;
// Track Member Progress
const trackMemberProgress = async (req, res) => {
    const { memberId } = req.params;
    try {
        const workoutLogs = await db_1.default.query("SELECT * FROM Workout_Log WHERE Member_ID = $1 ORDER BY Date DESC", [memberId]);
        const payments = await db_1.default.query("SELECT * FROM Payment WHERE Member_ID = $1 ORDER BY Payment_Date DESC", [memberId]);
        res.status(200).json({
            workoutLogs: workoutLogs.rows,
            payments: payments.rows,
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.trackMemberProgress = trackMemberProgress;
// Create Session
const createSession = async (req, res) => {
    const { trainerId } = req.params;
    const { date, time } = req.body;
    try {
        const result = await db_1.default.query(`INSERT INTO Session (Date, Time, Trainer_ID) 
       VALUES ($1, $2, $3) RETURNING *`, [date, time, trainerId]);
        res.status(201).json({ message: "Session created successfully", data: result.rows[0] });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.createSession = createSession;
