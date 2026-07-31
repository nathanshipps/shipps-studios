declare namespace YT {
  enum PlayerState {
    ENDED = 0,
    PLAYING = 1,
    PAUSED = 2,
  }

  interface OnStateChangeEvent {
    data: PlayerState;
    target: Player;
  }

  class Player {
    constructor(element: HTMLElement, options: { events: { onStateChange: (event: OnStateChangeEvent) => void } });
    seekTo(seconds: number, allowSeekAhead: boolean): void;
    playVideo(): void;
    destroy(): void;
  }
}

interface Window {
  YT: typeof YT;
  onYouTubeIframeAPIReady?: () => void;
}
