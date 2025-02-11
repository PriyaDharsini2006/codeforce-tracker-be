import { Request, Response } from 'express';
import { CodeforcesService } from '../services/codeforces.service';

export class CodeforcesController {
  private codeforcesService: CodeforcesService;

  constructor() {
    this.codeforcesService = new CodeforcesService();
  }

  getUserData = async (req: Request, res: Response): Promise<void> => {
    try {
      const { username } = req.params;

      if (!username) {
        res.status(400).json({ error: 'Username is required' });
        return;
      }

      const userData = await this.codeforcesService.getUserContestData(username);
      res.json(userData);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch user data' });
    }
  };
}
