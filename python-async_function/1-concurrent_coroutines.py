#!/usr/bin/env python3
"""Module for async wait_n coroutine"""

import asyncio
from typing import List

wait_random = __import__('0-basic_async_syntax').wait_random


async def wait_n(n: int, max_delay: int) -> List[float]:
    """Spawns wait_random n times and returns list of delays in ascending order"""
    delays = []

    async def append_delay():
        delay = await wait_random(max_delay)
        # Insert in sorted position (ascending order)
        for i, d in enumerate(delays):
            if delay < d:
                delays.insert(i, delay)
                return
        delays.append(delay)

    await asyncio.gather(*[append_delay() for _ in range(n)])

    return delays