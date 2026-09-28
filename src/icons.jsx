import { Code2, GraduationCap, Layers, Server, Shield, TrendingUp } from 'lucide-react'

/* Lucide registry for the solution cards, addressed by name. */
export const icons = {
  academy: GraduationCap,
  code: Code2,
  layers: Layers,
  server: Server,
  shield: Shield,
  trending: TrendingUp,
}

export function Icon({ name, ...props }) {
  const Cmp = icons[name] ?? Layers
  return <Cmp {...props} />
}

export default Icon
