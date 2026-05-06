export interface VisitorSession {
  id: string;
  createdAt: number;
  debugEnabled: boolean;
}

const VISITOR_KEY = 'portfolio_visitor_id';
const DEBUG_KEY = 'portfolio_debug_enabled';

function generateId(): string {
  return `vis_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

export function getOrCreateVisitorId(): string {
  if (typeof window === 'undefined') return '';

  let id = localStorage.getItem(VISITOR_KEY);
  if (!id) {
    id = generateId();
    localStorage.setItem(VISITOR_KEY, id);
  }
  return id;
}

export function getDebugMode(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(DEBUG_KEY) === 'true';
}

export function setDebugMode(enabled: boolean): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(DEBUG_KEY, enabled ? 'true' : 'false');
}

export interface LogEvent {
  event: string;
  sectionId?: string;
  visitorId: string;
  ts: number;
  payload?: Record<string, any>;
}

export function emitLog(
  eventOrObj: string | Omit<LogEvent, 'visitorId' | 'ts'>,
  sectionId?: string,
  payload?: Record<string, any>
): void {
  if (!getDebugMode()) return;

  let log: LogEvent;
  if (typeof eventOrObj === 'string') {
    log = {
      event: eventOrObj,
      sectionId,
      visitorId: getOrCreateVisitorId(),
      ts: Date.now(),
      payload,
    };
  } else {
    log = {
      visitorId: getOrCreateVisitorId(),
      ts: Date.now(),
      ...eventOrObj,
    };
  }

  console.log(JSON.stringify(log));
}
