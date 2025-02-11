export interface ContestRating {
    contestId: number;
    contestName: string;
    rank: number;
    oldRating: number;
    newRating: number;
  }
  
  export interface Problem {
    name: string;
    index: string;
  }
  
  export interface Submission {
    id: number;
    contestId: number;
    problem: Problem;
    verdict: string;
    timeConsumedMillis: number;
    creationTimeSeconds: number;
  }
  
  export interface ContestSubmission {
    problemName: string;
    verdict: string;
    timeTaken: string;
    submissionTime: string;
  }
  
  export interface ContestData {
    contestName: string;
    problemsSolved: number;
    submissions: ContestSubmission[];
  }
  
  export interface UserData {
    username: string;
    contestData: {
      [key: string]: ContestData;
    };
  }