package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.Goal;
import com.example.demo.repository.GoalRepository;

@Service
public class GoalServiceImpl implements GoalService {

    @Autowired
    private GoalRepository repository;

    @Override
    public String addGoal(Goal goal) {
        repository.save(goal);
        return "Goal added successfully";
    }

    @Override
    public List<Goal> viewAllGoals() {
        return repository.findAll();
    }

    @Override
    public String deleteGoal(int id) {
        Optional<Goal> object = repository.findById(id);
        String msg;
        if (object.isPresent()) {
            Goal goal = object.get();
            repository.delete(goal);
            msg = "Goal deleted successfully";
        } else {
            msg = "Goal ID not found";
        }
        return msg;
    }
}
