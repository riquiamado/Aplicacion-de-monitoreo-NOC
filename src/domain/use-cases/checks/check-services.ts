interface CheckServiceUseCase {
  execute(url: string): Promise<boolean>;
}

type SuccessCallback = () => void;
type ErrorCallback = (error: string) => void;

export class checkServices implements CheckServiceUseCase {

    constructor(
        private readonly succesCallback: SuccessCallback,
        private readonly errorCallback: ErrorCallback
    ) { }
  public async execute(url: string): Promise<boolean> {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error on check service ${url}`);
      }
      this.succesCallback()
      return true;
    } catch (error) {
      this.errorCallback(`${error}`);
      return false;
    }
  }
}
