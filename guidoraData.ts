export const ROLES = {
  "data scientist": {
    "must_have": [
      "python", "sql", "statistics", "machine learning",
      "feature engineering", "model evaluation", "etl",
      "pandas", "scikit-learn", "experimentation", "visualization"
    ]
  },
  "ml engineer": {
    "must_have": [
      "python", "pytorch", "tensorflow", "mlops",
      "inference", "deployment", "monitoring", "latency"
    ]
  }
} as const;

export const TECH_SYNONYMS: Record<string, string[]> = {
  "python": ["pandas","numpy","scikit-learn","sklearn","matplotlib","seaborn"],
  "sql": ["postgres","mysql","snowflake","bigquery"],
  "deployment": ["docker","kubernetes","fastapi","flask"],
  "pytorch": ["torch"],
  "tensorflow": ["tf","keras"]
};

export const SAMPLE_JD = `We’re hiring a Data Scientist to build models, run experiments, and partner with product.
Requirements: Python, SQL, statistics, ML, feature engineering, model evaluation, data visualization.
Nice to have: ETL, pandas, scikit-learn, deployment experience (FastAPI), experimentation frameworks.`;

export const SAMPLE_RESUME = `Gouthami Nadupuri — Data/AI
• Built analytics dashboards and ML classifiers (logistic regression, random forest) for incident triage.
• Designed ETL with Python/SQL, cleaned large datasets, automated reporting, and shipped Streamlit apps.
• Experience with scikit-learn, pandas, numpy, matplotlib; basics of TensorFlow/PyTorch; FastAPI for APIs.
• Collaborated with stakeholders; translated requirements into evaluated models and production-ready features.`;
