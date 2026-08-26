# Registro de Alumnos · Kumiho

Panel para visualizar el registro de alumnos de la Academia Kumiho, consumiendo datos en vivo desde una hoja de Google Sheets pública (exportada como CSV).

## Stack

- React 19 + TypeScript
- Vite 8
- Tailwind CSS v4
- Vitest + React Testing Library

## Arquitectura

```
src/
  types/        Modelos de dominio (Student, RawStudentRecord, StudentsSummary)
  config/       Configuración de la fuente de datos (URL de la hoja)
  constants/    Catálogo de cinturones y su resolución
  services/     Fetch + parseo CSV + mapeo a dominio (patrón repositorio)
  hooks/        useStudents, useStudentFilters, useDebouncedValue
  utils/        Fechas, strings, estadísticas — funciones puras y testeadas
  components/
    layout/     Header, Footer
    common/     Badge, Avatar, estados de carga/error/vacío
    stats/      Tarjetas de resumen
    students/   Toolbar de filtros, grilla y tarjeta de alumno
```

## Scripts

```bash
npm run dev            # servidor de desarrollo
npm run build           # typecheck + build de producción
npm run test             # tests una vez
npm run test:watch       # tests en modo watch
npm run test:coverage    # tests con reporte de cobertura
npm run lint              # oxlint
```

## Fuente de datos

La hoja debe estar compartida como "Cualquiera con el enlace puede ver". La URL de exportación CSV se configura en `src/config/sheet.ts`.
