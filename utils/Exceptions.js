import AppError from "./AppError.js";

export class BadRequestException extends AppError {
	constructor(message = "Bad Request") {
		super(400, message);
	}
}

export class UnauthorizedException extends AppError {
	constructor(message = "Unauthorized") {
		super(401, message);
	}
}

export class NotFoundException extends AppError {
	constructor(message = "Not Found") {
		super(404, message);
	}
}

export class ForbiddenException extends AppError {
	constructor(message = "Forbidden") {
		super(403, message);
	}
}
