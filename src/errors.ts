export class InvalidInputError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidInputError";
  }
}

export class MissingInputFileError extends Error {
  constructor() {
    super("Input file does not exist");
  }
}
