// Import required modules
const express = require("express");
const app = express();
const winston = require('winston');

//Winston logger
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'calculate-service' },
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),// Log errors to error.log file
        new winston.transports.File({ filename: 'combined.log' }), // Log all messages to combined.log file
    ],
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple(),
    }));
}
// Define arithmetic operations

// Addition operation
const add = (n1, n2) => {
    return n1 + n2;
}

// Subtraction operation
const sub = (n1, n2) => {
    return n1 - n2
}

// Multiplication operation
const mul = (n1, n2) => {
    return n1 * n2
}

// Division operation
const div = (n1, n2) => {
    return n1 / n2
}

// Exponentiation operation
const exp = (base, exponent) => {
    return Math.pow(base, exponent);
}

// Square root operation
const sqrt = (number) => {
    return Math.sqrt(number);
}

// Modulo operation
const mod = (n1, n2) => {
    return n1 % n2;
}

// Define API endpoints for each operation
//addition
app.get("/add", (req, res) => {
    try {
        const n1 = parseFloat(req.query.n1);
        const n2 = parseFloat(req.query.n2);
        if (isNaN(n1) || isNaN(n2)) {
            logger.error("Invalid input parameters for addition");
            throw new Error("Invalid input parameters");
        }
        logger.info(`Parameters ${n1} and ${n2} received for addition`);
        const result = add(n1, n2);
        res.status(200).json({ statusCode: 200, data: result });
    } catch (error) {
        logger.error(error.toString());
        res.status(500).json({ statusCode: 500, msg: error.toString() });
    }
});

//subtraction
app.get("/sub", (req, res) => {
    try {
        const n1 = parseFloat(req.query.n1);
        const n2 = parseFloat(req.query.n2);
        if (isNaN(n1) || isNaN(n2)) {
            logger.error("Invalid input parameters for subtraction");
            throw new Error("Invalid input parameters");
        }
        logger.info(`Parameters ${n1} and ${n2} received for subtraction`);
        const result = sub(n1, n2);
        res.status(200).json({ statusCode: 200, data: result });
    } catch (error) {
        logger.error(error.toString());
        res.status(500).json({ statusCode: 500, msg: error.toString() });
    }
});

//multiplication
app.get("/mul", (req, res) => {
    try {
        const n1 = parseFloat(req.query.n1);
        const n2 = parseFloat(req.query.n2);
        if (isNaN(n1) || isNaN(n2)) {
            logger.error("Invalid input parameters for multiplication");
            throw new Error("Invalid input parameters");
        }
        logger.info(`Parameters ${n1} and ${n2} received for multiplication`);
        const result = mul(n1, n2);
        res.status(200).json({ statusCode: 200, data: result });
    } catch (error) {
        logger.error(error.toString());
        res.status(500).json({ statusCode: 500, msg: error.toString() });
    }
});

//division
app.get("/div", (req, res) => {
    try {
        const n1 = parseFloat(req.query.n1);
        const n2 = parseFloat(req.query.n2);
        if (isNaN(n1) || isNaN(n2)) {
            logger.error("Invalid input parameters for division");
            throw new Error("Invalid input parameters");
        }
        if (n2 === 0) {
            logger.error("Division by zero");
            throw new Error("Division by zero");
        }
        logger.info(`Parameters ${n1} and ${n2} received for division`);
        const result = div(n1, n2);
        res.status(200).json({ statusCode: 200, data: result });
    } catch (error) {
        logger.error(error.toString());
        res.status(500).json({ statusCode: 500, msg: error.toString() });
    }
});

// Exponentiation
app.get("/exp", (req, res) => {
    try {
        const base = parseFloat(req.query.base);
        const exponent = parseFloat(req.query.exponent);
        if (isNaN(base) || isNaN(exponent)) {
            logger.error("Invalid input parameters for exponentiation");
            throw new Error("Invalid input parameters");
        }
        logger.info(`Base ${base} raised to exponent ${exponent}`);
        const result = exp(base, exponent);
        res.status(200).json({ statusCode: 200, data: result });
    } catch (error) {
        logger.error(error.toString());
        res.status(500).json({ statusCode: 500, msg: error.toString() });
    }
});

// Square root
app.get("/sqrt", (req, res) => {
    try {
        const number = parseFloat(req.query.number);
        if (isNaN(number)) {
            logger.error("Invalid input parameter for square root");
            throw new Error("Invalid input parameter");
        }
        logger.info(`Square root of ${number}`);
        const result = sqrt(number);
        res.status(200).json({ statusCode: 200, data: result });
    } catch (error) {
        logger.error(error.toString());
        res.status(500).json({ statusCode: 500, msg: error.toString() });
    }
});

// Modulo
app.get("/mod", (req, res) => {
    try {
        const n1 = parseFloat(req.query.n1);
        const n2 = parseFloat(req.query.n2);
        if (isNaN(n1) || isNaN(n2)) {
            logger.error("Invalid input parameters for modulo operation");
            throw new Error("Invalid input parameters");
        }
        logger.info(`Modulo operation of ${n1} mod ${n2}`);
        const result = mod(n1, n2);
        res.status(200).json({ statusCode: 200, data: result });
    } catch (error) {
        logger.error(error.toString());
        res.status(500).json({ statusCode: 500, msg: error.toString() });
    }
});

// Set server to listen on specified port
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
