"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const MemberController_1 = require("../controllers/MemberController");
const TrainerController_1 = require("../controllers/TrainerController");
const AdminController_1 = require("../controllers/AdminController");
const router = express_1.default.Router();
router.get("/", MemberController_1.test);
// Member routes
router.get("/members/:memberId/profile", MemberController_1.getMemberProfile);
router.post("/member", MemberController_1.getMemberProfileByPhoneNumber);
router.post("/members/:memberId/sessions", MemberController_1.bookSession);
router.get("/members/:memberId/workout-logs", MemberController_1.getWorkoutLogs);
router.get("/members/:memberId/diet-plan", MemberController_1.getDietPlan);
router.post("/members/:memberId/payments", MemberController_1.makePayment);
// Trainer routes
router.post('/trainer', TrainerController_1.getTrainerProfileByPhoneNumber);
router.get("/trainers/:trainerId/schedule", TrainerController_1.getTrainerSchedule);
router.get("/trainers/:trainerId/members", TrainerController_1.getAssignedMembers);
router.post("/trainers/:trainerId/members/:memberId/workout-logs", TrainerController_1.createWorkoutLog);
router.put("/trainers/:trainerId/workout-logs/:logId", TrainerController_1.updateWorkoutLog);
router.delete("/trainers/:trainerId/workout-logs/:logId", TrainerController_1.deleteWorkoutLog);
router.post("/trainers/:trainerId/diet-plans", TrainerController_1.createDietPlan);
router.put("/trainers/:trainerId/diet-plans/:planId", TrainerController_1.editDietPlan);
router.get("/trainers/:trainerId/members/:memberId/progress", TrainerController_1.trackMemberProgress);
router.post("/trainers/:trainerId/sessions", TrainerController_1.createSession);
// Admin routes
router.post("/admin/members", AdminController_1.addMember);
router.put("/admin/members/:memberId", AdminController_1.updateMember);
router.delete("/admin/members/:memberId", AdminController_1.deleteMember);
router.post("/admin/trainers", AdminController_1.addTrainer);
router.put("/admin/trainers/:trainerId", AdminController_1.updateTrainer);
router.delete("/admin/trainers/:trainerId", AdminController_1.deleteTrainer);
router.get("/admin/payments", AdminController_1.getPaymentHistory);
router.get("/admin/reports", AdminController_1.generateReport);
exports.default = router;
