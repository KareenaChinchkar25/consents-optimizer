from pydantic import BaseModel
from typing import List, Optional

class ConsentInput(BaseModel):
    website: str
    platform: str
    permission: str
    category: str
    purpose: str
    status: str
    dataFlow: List[str]
    retention_months: int
    grantedOn: str   # <-- must be plain string

    class Config:
        arbitrary_types_allowed = True
        json_loads = staticmethod(lambda x: x)
        validate_assignment = False
