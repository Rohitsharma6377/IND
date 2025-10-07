import { EventEmitter } from 'events';

// Simple in-memory event bus and FIFO queue for background jobs.
// For production, adapt to Redis/SQS by swapping implementations.
const bus = new EventEmitter();

const queue = [];
let processing = false;

export function emit(event, payload) {
  try { bus.emit(event, payload); } catch {}
}

export function on(event, handler) {
  bus.on(event, handler);
  return () => bus.off(event, handler);
}

export function enqueue(job) {
  queue.push(job);
  pump();
}

async function pump() {
  if (processing) return;
  processing = true;
  while (queue.length) {
    const job = queue.shift();
    try {
      if (typeof job === 'function') {
        await job();
      } else if (job && typeof job.run === 'function') {
        await job.run();
      }
    } catch (e) {
      try { bus.emit('queue:error', e); } catch {}
    }
  }
  processing = false;
}

export default { emit, on, enqueue };
