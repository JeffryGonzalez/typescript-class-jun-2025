import { computed } from '@angular/core';
import { signalStoreFeature, withComputed, withState } from '@ngrx/signals';

type RequestStatus = 'idle' | 'loading' | 'mutating' | { error: string };

type ApiFeatureState = { requestStatus: RequestStatus };
export function withApiFeature() {
  return signalStoreFeature(
    withState<ApiFeatureState>({
      requestStatus: 'idle',
    }),
    withComputed(({ requestStatus }) => ({
      isIdle: computed(() => requestStatus() === 'idle'),
      isLoading: computed(() => requestStatus() === 'loading'),
      isMutating: computed(() => requestStatus() === 'mutating'),
      hasError: computed(() => {
        const status = requestStatus();
        return typeof status === 'object';
      }),
      getError: computed(() => {
        const status = requestStatus();
        return typeof status === 'object' ? status.error : null;
      }),
    })),
  );
}

export function setIdle(): ApiFeatureState {
  return { requestStatus: 'idle' };
}

export function setLoading(): ApiFeatureState {
  return { requestStatus: 'loading' };
}

export function setMutating(): ApiFeatureState {
  return { requestStatus: 'mutating' };
}

export function setError(error: string): ApiFeatureState {
  return { requestStatus: { error } };
}
