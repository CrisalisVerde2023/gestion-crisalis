// loadingEvent.ts
type LoadingCallback = (isLoading: boolean) => void;

export const triggerLoading = (
  isLoading: boolean,
  callback: LoadingCallback
): void => {
  callback(isLoading);
};
