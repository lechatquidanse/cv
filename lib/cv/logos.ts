/**
 * Company marks shown faintly behind each recent role on screen (files in public/).
 * Kept apart from content.ts: they are decoration, not career facts.
 */
export const roleLogos: Partial<Record<string, string>> = {
  expandnow: "/media/logos/expandnow.svg",
  zeelo: "/media/logos/zeelo.svg",
  signaturit: "/media/logos/signaturit.svg",
}

/** Marks next to the places named in a job's fit block, by display name. */
export const placeLogos: Partial<Record<string, string>> = {
  ExpandNow: roleLogos.expandnow,
  Zeelo: roleLogos.zeelo,
  Signaturit: roleLogos.signaturit,
  "Foot Master Quiz": "/media/fmq-icon.png",
}
