
def risk_to_category(risk_score):
    """
    Convert risk score (0–10 scale) to category
    """

    # Ensure numeric
    try:
        score = float(risk_score)
    except:
        return "Unknown"

    if score >= 7:
        return "High"
    elif score >= 4.0:
        return "Medium"
    else:
        return "Low"


def validate_input_data(df):
    """
    Ensures all required columns exist before preprocessing/prediction.
    """

    required_columns = [
        "website",
        "platform",
        "permission",
        "category",
        "purpose",
        "status",
        "dataFlow",
        "grantedOn",
        "retention_months"
    ]

    missing = [col for col in required_columns if col not in df.columns]
    if missing:
        raise ValueError(f"Missing required columns: {missing}")

    return True
