import express from "express";
import { bookSession, getDietPlan, getMemberProfile, getMemberProfileByPhoneNumber, getWorkoutLogs, makePayment, test } from "../controllers/MemberController";
import { createDietPlan, createSession, createWorkoutLog, deleteWorkoutLog, editDietPlan, getAssignedMembers, getTrainerProfileByPhoneNumber, getTrainerSchedule, trackMemberProgress, updateWorkoutLog } from "../controllers/TrainerController";
import { addMember, addTrainer, deleteMember, deleteTrainer, generateReport, getPaymentHistory, updateMember, updateTrainer } from "../controllers/AdminController";


const router = express.Router();

router.get("/" , test);
// Member routes
router.get("/members/:memberId/profile", getMemberProfile);
router.post("/member" , getMemberProfileByPhoneNumber);
router.post("/members/:memberId/sessions", bookSession);
router.get("/members/:memberId/workout-logs", getWorkoutLogs);
router.get("/members/:memberId/diet-plan", getDietPlan);
router.post("/members/:memberId/payments", makePayment);

// Trainer routes
router.post('/trainer',getTrainerProfileByPhoneNumber);
router.get("/trainers/:trainerId/schedule", getTrainerSchedule);
router.get("/trainers/:trainerId/members", getAssignedMembers);
router.post("/trainers/:trainerId/members/:memberId/workout-logs", createWorkoutLog);
router.put("/trainers/:trainerId/workout-logs/:logId", updateWorkoutLog);
router.delete("/trainers/:trainerId/workout-logs/:logId", deleteWorkoutLog);
router.post("/trainers/:trainerId/diet-plans", createDietPlan);
router.put("/trainers/:trainerId/diet-plans/:planId", editDietPlan);
router.get("/trainers/:trainerId/members/:memberId/progress", trackMemberProgress);
router.post("/trainers/:trainerId/sessions", createSession);

// Admin routes
router.post("/admin/members", addMember);
router.put("/admin/members/:memberId", updateMember);
router.delete("/admin/members/:memberId", deleteMember);
router.post("/admin/trainers", addTrainer);
router.put("/admin/trainers/:trainerId", updateTrainer);
router.delete("/admin/trainers/:trainerId", deleteTrainer);
router.get("/admin/payments", getPaymentHistory);
router.get("/admin/reports", generateReport);

export default router;
