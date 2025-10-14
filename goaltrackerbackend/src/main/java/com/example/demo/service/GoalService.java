package com.example.demo.service;

import java.util.List;
import com.example.demo.model.Goal;

public interface GoalService {

    String addGoal(Goal goal);

    List<Goal> viewAllGoals();

    String deleteGoal(int id);
}
