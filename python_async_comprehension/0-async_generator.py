#!/usr/bin/env python3
"""Module for async_generator coroutine"""

import asyncio
import random
from typing import Generator


async def async_generator() -> Generator[float, None, None]:
    """Yields a random number between 0 and 10, ten times, waiting 1 second each"""
    for _ in range(10):
        await asyncio.sleep(1)
        yield random.uniform(0, 10)