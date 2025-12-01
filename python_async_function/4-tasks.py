#!/usr/bin/env python3
"""Module for task_wait_n function"""

import asyncio
from typing import List

task_wait_random = __import__('3-tasks').task_wait_random


async def task_wait_n(n: int, max_delay: int) -> List[float]:
    """Spawns task_wait_random n times and returns list of delays in ascending order"""
    delays = []

    async def append_delay():
        delay = await task_wait_random(max_delay)
        for i, d in enumerate(delays):
            if delay < d:
                delays.insert(i, delay)
                return
        delays.append(delay)

    await asyncio.gather(*[append_delay() for _ in range(n)])

    return delays
