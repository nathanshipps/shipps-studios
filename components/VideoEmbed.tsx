"use client";

import { useRef, useState, useEffect } from "react";
import type { VideoSource } from "@/lib/projects";

interface Props {
  source: VideoSource;
  autoplay?: boolean;
  muted?: boolean;
  loop?: boolean;
  controls?: boolean;
  className?: string;
  poster?: string;
}

export default function VideoEmbed({
  source,
  autoplay = false,
  muted = true,
  loop = true,
  controls = false,
  className = "",
  poster,
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (source.type === "mp4" && videoRef.current && autoplay) {
      videoRef.current.play().catch(() => {});
    }
  }, [source, autoplay]);

  // Clip looping via Vimeo Player SDK
  useEffect(() => {
    if (source.type !== "vimeo") return;
    if (!source.startTime && !source.endTime) return;
    if (!iframeRef.current) return;

    const startTime = source.startTime ?? 0;
    const endTime = source.endTime;

    let player: import("@vimeo/player").default | null = null;

    import("@vimeo/player").then(({ default: Player }) => {
      if (!iframeRef.current) return;
      player = new Player(iframeRef.current);

      player.ready().then(() => {
        player!.setCurrentTime(startTime);

        if (endTime !== undefined) {
          player!.on("timeupdate", ({ seconds }: { seconds: number }) => {
            if (seconds >= endTime) {
              player!.setCurrentTime(startTime);
            }
          });
        }
      });
    });

    return () => {
      player?.off("timeupdate");
    };
  }, [source]);

  if (source.type === "vimeo") {
    const params = new URLSearchParams({
      autoplay: autoplay ? "1" : "0",
      muted: muted ? "1" : "0",
      // Disable native loop when we're managing a clip loop ourselves
      loop: (loop && !source.endTime) ? "1" : "0",
      controls: controls ? "1" : "0",
      background: !controls ? "1" : "0",
      byline: "0",
      title: "0",
      portrait: "0",
      dnt: "1",
    });

    if (source.hash) params.set("h", source.hash);

    return (
      <div className={`relative w-full h-full ${className}`}>
        <iframe
          ref={iframeRef}
          src={`https://player.vimeo.com/video/${source.id}?${params}`}
          allow="autoplay; fullscreen; picture-in-picture"
          style={{
            border: "none",
            position: "absolute",
            top: "50%",
            left: "50%",
            width: controls ? "100%" : "177.78vh",
            height: controls ? "100%" : "56.25vw",
            minWidth: controls ? undefined : "100%",
            minHeight: controls ? undefined : "100%",
            transform: "translate(-50%, -50%)",
          }}
          title="Video"
        />
      </div>
    );
  }

  if (source.type === "youtube") {
    const params = new URLSearchParams({
      controls: controls ? "1" : "0",
      autoplay: autoplay ? "1" : "0",
      mute: muted ? "1" : "0",
      loop: loop ? "1" : "0",
      playlist: source.id,
      rel: "0",
      modestbranding: "1",
    });

    return (
      <div className={`relative w-full h-full ${className}`}>
        <iframe
          src={`https://www.youtube.com/embed/${source.id}?${params}`}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          style={{ border: "none", position: "absolute", inset: 0, width: "100%", height: "100%" }}
          title="Video"
        />
      </div>
    );
  }

  // MP4
  return (
    <div className={`relative w-full h-full ${className}`}>
      {!loaded && poster && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={poster}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      <video
        ref={videoRef}
        src={source.url}
        autoPlay={autoplay}
        muted={muted}
        loop={loop}
        controls={controls}
        playsInline
        poster={poster}
        onCanPlay={() => setLoaded(true)}
        className="absolute inset-0 w-full h-full object-cover"
      />
    </div>
  );
}
