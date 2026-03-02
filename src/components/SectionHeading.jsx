export default function SectionHeading({ kicker, title, description, align='left' }) {
  return (
    <div style={{textAlign: align, maxWidth: 760, margin: align === 'center' ? '0 auto' : undefined}}>
      {kicker && <div className="kicker">{kicker}</div>}
      <div className="h2">{title}</div>
      {description && <div className="p">{description}</div>}
    </div>
  )
}
