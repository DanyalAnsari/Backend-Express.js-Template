import ControllerErrorHandler from "#utils/helpers/ControllerErrorHandler";
import { Router } from "express";
import * as Exceptions from "#utils/Exceptions";

const router= Router();

// Route using ControllerErrorHandler
router.get('/structured', ControllerErrorHandler(async (req, res) => {
    return {
        statusCode: 200,
        data: { message: 'Structured success' }
    };
}));

// Throwing custom AppError
router.get('/bad', (req, res, next) => {
    next(new Exceptions.BadRequestException('This is a bad request'));
});

// Native async error caught by express-async-errors
router.get('/crash', async (req, res) => {
    throw new Error('Something failed!');
});

export default router
