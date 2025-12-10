#!/usr/bin/env python3
"""Module to update topics of a school document in MongoDB"""


def update_topics(mongo_collection, name, topics):
    """
    Changes all topics of a school document based on the name.

    Args:
        mongo_collection: pymongo collection object
        name: school name to update
        topics: list of topics to set for the school
    """
    mongo_collection.update_many(
        { "name": name },
        { "$set": { "topics": topics } }
    )