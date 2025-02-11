import axios from 'axios';
import { ContestRating, Submission, UserData } from '../types/codeforces.types';

export class CodeforcesService {
  private readonly baseUrl = 'https://codeforces.com/api';

  async getUserContestData(username: string): Promise<UserData> {
    try {
      const [ratingResponse, submissionResponse] = await Promise.all([
        this.fetchContestHistory(username),
        this.fetchSubmissionHistory(username)
      ]);

      const contests = ratingResponse.data.result;
      const submissions = submissionResponse.data.result;

      const contestMap = this.createContestMap(contests);
      const contestData = this.processSubmissions(submissions, contestMap);

      return {
        username,
        contestData
      };
    } catch (error) {
      throw new Error('Failed to fetch user data');
    }
  }

  private async fetchContestHistory(username: string) {
    return axios.get<{ result: ContestRating[] }>(
      `${this.baseUrl}/user.rating?handle=${username}`
    );
  }

  private async fetchSubmissionHistory(username: string) {
    return axios.get<{ result: Submission[] }>(
      `${this.baseUrl}/user.status?handle=${username}&from=1&count=1000`
    );
  }

  private createContestMap(contests: ContestRating[]): Record<number, string> {
    return contests.reduce((acc, contest) => {
      acc[contest.contestId] = contest.contestName;
      return acc;
    }, {} as Record<number, string>);
  }

  private processSubmissions(
    submissions: Submission[],
    contestMap: Record<number, string>
  ) {
    const contestData: Record<string, ContestData> = {};

    submissions.forEach((submission) => {
      const { contestId, problem, verdict, timeConsumedMillis, creationTimeSeconds } = submission;

      if (!contestId || !contestMap[contestId]) return;

      if (!contestData[contestId]) {
        contestData[contestId] = {
          contestName: contestMap[contestId],
          problemsSolved: 0,
          submissions: [],
        };
      }

      if (verdict === 'OK') {
        contestData[contestId].problemsSolved += 1;
      }

      contestData[contestId].submissions.push({
        problemName: problem.name,
        verdict,
        timeTaken: `${(timeConsumedMillis / 1000).toFixed(2)} sec`,
        submissionTime: new Date(creationTimeSeconds * 1000).toLocaleString(),
      });
    });

    return contestData;
  }
}