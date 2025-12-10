#!/usr/bin/env python3
"""Module to find schools by topic in MongoDB"""


def schools_by_topic(mongo_collection, topic):
    """
    Returns the list of schools having a specific topic.

    Args:
        mongo_collection: pymongo collection object
        topic: topic to search for

    Returns:
        List of schools that have the specified topic
    """
    return list(mongo_collection.find({ "topics": topic }))
