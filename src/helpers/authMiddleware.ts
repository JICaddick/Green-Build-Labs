import { Request, Response, NextFunction } from 'express';

interface CustomRequest extends Request {
  id?: string;
}

const authenticateUser = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Extract user credentials from the request
    const { id } = req.params;

    // Attach the user ID to the request object for future use
    req.id = id;
    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export { authenticateUser };
