import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Cloud,
  Code2,
  Headphones,
  Layers,
  Mail,
  Megaphone,
  Menu,
  Music,
  Phone,
  PlayCircle,
  Send,
  Server,
  Shield,
  Star,
  X,
} from 'lucide-react'

/* Lucide icon registry — same glyphs as the reference's
   `lucide.createIcons()` set, resolved to React components here. */
export const icons = {
  activity: Activity,
  arrowRight: ArrowRight,
  arrowUpRight: ArrowUpRight,
  check: CheckCircle2,
  clock: Clock,
  cloud: Cloud,
  code: Code2,
  headphones: Headphones,
  layers: Layers,
  mail: Mail,
  megaphone: Megaphone,
  menu: Menu,
  music: Music,
  phone: Phone,
  play: PlayCircle,
  send: Send,
  server: Server,
  shield: Shield,
  star: Star,
  close: X,
}

export function Icon({ name, ...props }) {
  const Cmp = icons[name] ?? Layers
  return <Cmp {...props} />
}

export default Icon
