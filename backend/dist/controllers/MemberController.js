"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makePayment = exports.getDietPlan = exports.getWorkoutLogs = exports.bookSession = exports.getMemberProfileByPhoneNumber = exports.getMemberProfile = exports.test = void 0;
const db_1 = __importDefault(require("../config/db"));
const test = async (req, res) => {
    // console.log(pool);
    try {
        const result = await db_1.default.query("SELECT * FROM MEMBER");
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Member not found" });
        }
        res.status(200).json(result.rows);
        //   res.status(200).json({msg:"Hello"});
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.test = test;
// Get Member Profile
const getMemberProfile = async (req, res) => {
    const { memberId } = req.params;
    try {
        const result = await db_1.default.query("SELECT * FROM Member WHERE Member_ID = $1", [memberId]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Member not found" });
        }
        res.status(200).json(result.rows[0]);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getMemberProfile = getMemberProfile;
// Get Member Profile by Phone number
const getMemberProfileByPhoneNumber = async (req, res) => {
    const { phonenumber } = req.body;
    try {
        const result = await db_1.default.query("SELECT * FROM Member WHERE Phone = $1", [phonenumber]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Member not found" });
        }
        res.status(200).json(result.rows[0]);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getMemberProfileByPhoneNumber = getMemberProfileByPhoneNumber;
// Book a Fitness Session
const bookSession = async (req, res) => {
    const { memberId } = req.params;
    const { sessionId } = req.body;
    try {
        const result = await db_1.default.query("INSERT INTO Member_Sessions (Member_ID, Session_ID) VALUES ($1, $2) RETURNING *", [memberId, sessionId]);
        res.status(201).json({ message: "Session booked successfully", data: result.rows[0] });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.bookSession = bookSession;
// Get Workout Logs
const getWorkoutLogs = async (req, res) => {
    const { memberId } = req.params;
    try {
        const result = await db_1.default.query("SELECT * FROM Workout_Log WHERE Member_ID = $1 ORDER BY Date DESC", [memberId]);
        res.status(200).json(result.rows);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getWorkoutLogs = getWorkoutLogs;
// Get Diet Plan
const getDietPlan = async (req, res) => {
    const { memberId } = req.params;
    try {
        const result = await db_1.default.query("SELECT * FROM Diet_Plan WHERE Member_ID = $1", [memberId]);
        res.status(200).json(result.rows);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getDietPlan = getDietPlan;
// Make Payment
const makePayment = async (req, res) => {
    const { memberId } = req.params;
    const { amount, paymentType } = req.body;
    try {
        const result = await db_1.default.query("INSERT INTO Payment (Member_ID, Amount, Payment_Date, Payment_Type) VALUES ($1, $2, CURRENT_DATE, $3) RETURNING *", [memberId, amount, paymentType]);
        res.status(201).json({ message: "Payment successful", data: result.rows[0] });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.makePayment = makePayment;
