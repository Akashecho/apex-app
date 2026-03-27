// App-wide constants

export const APP_NAME = 'APEX';
export const APP_TAGLINE = 'The invite-only merit network for top students';

// Membership
export const SUBSCRIPTION_PRICE_INR = 200;
export const TRIAL_DAYS = 7;

// Pods
export const POD_MIN_SIZE = 5;
export const POD_MAX_SIZE = 7;

// AI Credits
export const MONTHLY_AI_CREDITS = 30;
export const AI_CREDIT_COSTS: Record<string, number> = {
  resume_improve: 3,
  interview_prep: 5,
  outreach_draft: 2,
  project_ideation: 3,
  research_summary: 2,
  daily_planner: 1,
  meeting_notes: 2,
  resource_explain: 1,
};

// Scoring weights
export const SCORE_WEIGHTS = {
  achievement: 30,
  contribution: 20,
  consistency: 20,
  followthrough: 15,
  trust: 15,
};

// Application rubric weights
export const RUBRIC_WEIGHTS = {
  proofOfWork: 30,
  trajectory: 20,
  contributionMindset: 20,
  communication: 15,
  integrity: 15,
};

// Content constraints
export const POST_TITLE_MAX = 200;
export const POST_BODY_MAX = 5000;
export const COMMENT_MAX = 2000;
export const BIO_MAX = 500;
export const MAX_COMMENT_DEPTH = 4;
export const MAX_MEDIA_PER_POST = 4;
export const MAX_PROOF_FILES = 5;
export const MAX_PROOF_FILE_SIZE_MB = 20;
export const MAX_IMAGE_SIZE_MB = 10;
export const MAX_PROFILE_PHOTO_SIZE_MB = 5;

// Post types (matching architecture section 11.1)
export const POST_TYPES = [
  { value: 'win', label: 'Win', icon: 'trophy', color: '#D1A85A' },
  { value: 'ask', label: 'Ask', icon: 'help-circle', color: '#1C8F80' },
  { value: 'resource', label: 'Resource', icon: 'book-open', color: '#6366F1' },
  { value: 'opportunity', label: 'Opportunity', icon: 'briefcase', color: '#E3173E' },
  { value: 'build_log', label: 'Build Log', icon: 'hammer', color: '#D1A85A' },
  { value: 'collab_request', label: 'Collab', icon: 'users', color: '#EC4899' },
  { value: 'event_note', label: 'Event Note', icon: 'calendar', color: '#8B5CF6' },
  { value: 'discussion', label: 'Discussion', icon: 'message-circle', color: '#6B717E' },
] as const;

// Tracks
export const TRACKS = [
  { value: 'career', label: 'Career', icon: 'briefcase', color: '#1C8F80', description: 'Internships, placements, interview prep, CV, networking' },
  { value: 'founder', label: 'Founder', icon: 'rocket', color: '#E3173E', description: 'Startup ideas, MVPs, cofounders, GTM, demos' },
  { value: 'research', label: 'Research', icon: 'flask-conical', color: '#6366F1', description: 'Papers, labs, grants, conferences, academic opportunities' },
  { value: 'builder', label: 'Builder', icon: 'hammer', color: '#D1A85A', description: 'Coding, hackathons, open source, product shipping' },
  { value: 'creator', label: 'Creator', icon: 'pen-tool', color: '#EC4899', description: 'Writing, video, public brand, audience growth' },
  { value: 'design', label: 'Design', icon: 'palette', color: '#8B5CF6', description: 'Product design, UI systems, portfolio, challenges' },
] as const;

// Onboarding steps
export const ONBOARDING_STEPS = [
  { key: 'passport', label: 'Complete your Merit Passport', deadline: '48 hours' },
  { key: 'pod', label: 'Join a pod', deadline: '72 hours' },
  { key: 'intro', label: 'Receive your first warm intro', deadline: 'Week 1' },
  { key: 'event', label: 'Attend a live session', deadline: '7 days' },
  { key: 'challenge', label: 'Complete your first challenge', deadline: '14 days' },
  { key: 'badge', label: 'Earn your first badge', deadline: '14 days' },
] as const;

// Notification types
export const NOTIFICATION_TYPES = {
  pod_checkin_due: { icon: 'users', color: '#1C8F80' },
  intro_accepted: { icon: 'user-plus', color: '#D1A85A' },
  opportunity_expiring: { icon: 'clock', color: '#E3173E' },
  event_reminder: { icon: 'calendar', color: '#6366F1' },
  score_milestone: { icon: 'trending-up', color: '#D1A85A' },
  ai_credits_available: { icon: 'sparkles', color: '#8B5CF6' },
  new_match: { icon: 'heart', color: '#EC4899' },
  post_reply: { icon: 'message-circle', color: '#1C8F80' },
  mention: { icon: 'at-sign', color: '#6366F1' },
  badge_earned: { icon: 'award', color: '#D1A85A' },
  system: { icon: 'bell', color: '#6B717E' },
} as const;
