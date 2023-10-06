// loadingEvent.ts
export const triggerLoading = (
  isLoading: boolean,
  callback: React.Dispatch<React.SetStateAction<boolean>>
): void => {
  callback(isLoading);
};
