'use client'

import { useState } from 'react'
import styles from './page.module.css'

interface Experience {
  company: string
  position: string
  period: string
  description: string
}

interface Education {
  institution: string
  degree: string
  period: string
}

interface ResumeData {
  name: string
  title: string
  email: string
  phone: string
  location: string
  summary: string
  experiences: Experience[]
  education: Education[]
  skills: string
}

export default function Home() {
  const [data, setData] = useState<ResumeData>({
    name: '',
    title: '',
    email: '',
    phone: '',
    location: '',
    summary: '',
    experiences: [{ company: '', position: '', period: '', description: '' }],
    education: [{ institution: '', degree: '', period: '' }],
    skills: ''
  })

  const addExperience = () => {
    setData({
      ...data,
      experiences: [...data.experiences, { company: '', position: '', period: '', description: '' }]
    })
  }

  const removeExperience = (index: number) => {
    const newExp = data.experiences.filter((_, i) => i !== index)
    setData({ ...data, experiences: newExp })
  }

  const updateExperience = (index: number, field: keyof Experience, value: string) => {
    const newExp = [...data.experiences]
    newExp[index][field] = value
    setData({ ...data, experiences: newExp })
  }

  const addEducation = () => {
    setData({
      ...data,
      education: [...data.education, { institution: '', degree: '', period: '' }]
    })
  }

  const removeEducation = (index: number) => {
    const newEdu = data.education.filter((_, i) => i !== index)
    setData({ ...data, education: newEdu })
  }

  const updateEducation = (index: number, field: keyof Education, value: string) => {
    const newEdu = [...data.education]
    newEdu[index][field] = value
    setData({ ...data, education: newEdu })
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <h1 className={styles.logo}>Currículo Rápido</h1>

        <div className={styles.form}>
          <section className={styles.section}>
            <h2>Informações Pessoais</h2>
            <input
              type="text"
              placeholder="Nome completo"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Cargo desejado"
              value={data.title}
              onChange={(e) => setData({ ...data, title: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
            <input
              type="tel"
              placeholder="Telefone"
              value={data.phone}
              onChange={(e) => setData({ ...data, phone: e.target.value })}
            />
            <input
              type="text"
              placeholder="Localização"
              value={data.location}
              onChange={(e) => setData({ ...data, location: e.target.value })}
            />
          </section>

          <section className={styles.section}>
            <h2>Resumo Profissional</h2>
            <textarea
              placeholder="Descreva brevemente sua experiência e objetivos..."
              value={data.summary}
              onChange={(e) => setData({ ...data, summary: e.target.value })}
              rows={4}
            />
          </section>

          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2>Experiência</h2>
              <button onClick={addExperience} className={styles.addBtn}>+ Adicionar</button>
            </div>
            {data.experiences.map((exp, index) => (
              <div key={index} className={styles.item}>
                <div className={styles.itemHeader}>
                  <span>Experiência {index + 1}</span>
                  {data.experiences.length > 1 && (
                    <button onClick={() => removeExperience(index)} className={styles.removeBtn}>×</button>
                  )}
                </div>
                <input
                  type="text"
                  placeholder="Empresa"
                  value={exp.company}
                  onChange={(e) => updateExperience(index, 'company', e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Cargo"
                  value={exp.position}
                  onChange={(e) => updateExperience(index, 'position', e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Período (ex: Jan 2020 - Dez 2022)"
                  value={exp.period}
                  onChange={(e) => updateExperience(index, 'period', e.target.value)}
                />
                <textarea
                  placeholder="Descrição das atividades..."
                  value={exp.description}
                  onChange={(e) => updateExperience(index, 'description', e.target.value)}
                  rows={3}
                />
              </div>
            ))}
          </section>

          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2>Formação</h2>
              <button onClick={addEducation} className={styles.addBtn}>+ Adicionar</button>
            </div>
            {data.education.map((edu, index) => (
              <div key={index} className={styles.item}>
                <div className={styles.itemHeader}>
                  <span>Formação {index + 1}</span>
                  {data.education.length > 1 && (
                    <button onClick={() => removeEducation(index)} className={styles.removeBtn}>×</button>
                  )}
                </div>
                <input
                  type="text"
                  placeholder="Instituição"
                  value={edu.institution}
                  onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Curso/Grau"
                  value={edu.degree}
                  onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Período"
                  value={edu.period}
                  onChange={(e) => updateEducation(index, 'period', e.target.value)}
                />
              </div>
            ))}
          </section>

          <section className={styles.section}>
            <h2>Habilidades</h2>
            <textarea
              placeholder="Liste suas habilidades separadas por vírgula..."
              value={data.skills}
              onChange={(e) => setData({ ...data, skills: e.target.value })}
              rows={3}
            />
          </section>

          <button onClick={handlePrint} className={styles.printBtn}>
            Imprimir / Salvar PDF
          </button>
        </div>
      </div>

      <div className={styles.preview}>
        <div className={styles.resume}>
          {data.name && (
            <header className={styles.resumeHeader}>
              <h1>{data.name}</h1>
              {data.title && <h2>{data.title}</h2>}
              <div className={styles.contact}>
                {data.email && <span>{data.email}</span>}
                {data.phone && <span>{data.phone}</span>}
                {data.location && <span>{data.location}</span>}
              </div>
            </header>
          )}

          {data.summary && (
            <section className={styles.resumeSection}>
              <h3>Resumo Profissional</h3>
              <p>{data.summary}</p>
            </section>
          )}

          {data.experiences.some(exp => exp.company || exp.position) && (
            <section className={styles.resumeSection}>
              <h3>Experiência Profissional</h3>
              {data.experiences.map((exp, index) => (
                (exp.company || exp.position) && (
                  <div key={index} className={styles.resumeItem}>
                    <div className={styles.resumeItemHeader}>
                      <strong>{exp.position}</strong>
                      {exp.period && <span className={styles.period}>{exp.period}</span>}
                    </div>
                    {exp.company && <div className={styles.company}>{exp.company}</div>}
                    {exp.description && <p>{exp.description}</p>}
                  </div>
                )
              ))}
            </section>
          )}

          {data.education.some(edu => edu.institution || edu.degree) && (
            <section className={styles.resumeSection}>
              <h3>Formação Acadêmica</h3>
              {data.education.map((edu, index) => (
                (edu.institution || edu.degree) && (
                  <div key={index} className={styles.resumeItem}>
                    <div className={styles.resumeItemHeader}>
                      <strong>{edu.degree}</strong>
                      {edu.period && <span className={styles.period}>{edu.period}</span>}
                    </div>
                    {edu.institution && <div className={styles.company}>{edu.institution}</div>}
                  </div>
                )
              ))}
            </section>
          )}

          {data.skills && (
            <section className={styles.resumeSection}>
              <h3>Habilidades</h3>
              <p>{data.skills}</p>
            </section>
          )}

          {!data.name && !data.title && (
            <div className={styles.empty}>
              <p>Preencha o formulário ao lado para ver seu currículo aqui</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
