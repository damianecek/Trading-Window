import unittest
from src.technical_analysis import add_technical_indicators
import pandas as pd

class TestTechnicalIndicators(unittest.TestCase):
    def test_add_technical_indicators(self):
        data = pd.DataFrame({"Close": [100, 102, 105, 107, 110]})
        result = add_technical_indicators(data)
        self.assertIn("RSI", result.columns)

if __name__ == "__main__":
    unittest.main()
