export type ApiResponse = {
  status: "Success" | "Error";
  message: string;
};

export type Params = Promise<{ id: string }>;
