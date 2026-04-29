const EMBERS = Array.from({ length: 18 }, (_, index) => ({
  id: index,
  left: `${4 + ((index * 11) % 88)}%`,
  size: `${8 + (index % 5) * 4}px`,
  delay: `${(index % 7) * 0.55}s`,
  duration: `${5 + (index % 6) * 1.15}s`
}));

export function FireOverlay() {
  return (
    <div class="fire-overlay" aria-hidden="true">
      <div class="fire-glow fire-glow-left" />
      <div class="fire-glow fire-glow-right" />
      <div class="fire-wave fire-wave-one" />
      <div class="fire-wave fire-wave-two" />
      {EMBERS.map((ember) => (
        <span
          key={ember.id}
          class="ember"
          style={{
            left: ember.left,
            width: ember.size,
            height: ember.size,
            animationDelay: ember.delay,
            animationDuration: ember.duration
          }}
        />
      ))}
    </div>
  );
}
