import { supabase } from '../lib/supabase';

export const forumService = {
  async getQuestions(category = null, searchTerm = null) {
    let query = supabase
      .from('questions')
      .select(`
        *,
        answers (
          id,
          user_name,
          enrollment_no,
          answer_text,
          created_at
        )
      `)
      .order('vote_count', { ascending: false })
      .order('created_at', { ascending: false });

    if (category && category !== 'All') {
      query = query.eq('category', category);
    }

    if (searchTerm) {
      query = query.ilike('question_text', `%${searchTerm}%`);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data;
  },

  async addQuestion(questionData) {
    const { data, error } = await supabase
      .from('questions')
      .insert([
        {
          user_name: questionData.userName,
          enrollment_no: questionData.enrollmentNo,
          question_text: questionData.questionText,
          category: questionData.category || 'General',
          vote_count: 0,
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async addAnswer(answerData) {
    const { data, error } = await supabase
      .from('answers')
      .insert([
        {
          question_id: answerData.questionId,
          user_name: answerData.userName,
          enrollment_no: answerData.enrollmentNo,
          answer_text: answerData.answerText,
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async voteQuestion(questionId, userIdentifier) {
    const { data: existingVote } = await supabase
      .from('votes')
      .select('id')
      .eq('question_id', questionId)
      .eq('user_identifier', userIdentifier)
      .maybeSingle();

    if (existingVote) {
      return { alreadyVoted: true };
    }

    const { error: voteError } = await supabase
      .from('votes')
      .insert([
        {
          question_id: questionId,
          user_identifier: userIdentifier,
        },
      ]);

    if (voteError) throw voteError;

    const { data: question, error: questionError } = await supabase
      .from('questions')
      .select('vote_count')
      .eq('id', questionId)
      .single();

    if (questionError) throw questionError;

    const { error: updateError } = await supabase
      .from('questions')
      .update({ vote_count: question.vote_count + 1 })
      .eq('id', questionId);

    if (updateError) throw updateError;

    return { success: true };
  },

  async unvoteQuestion(questionId, userIdentifier) {
    const { error: deleteError } = await supabase
      .from('votes')
      .delete()
      .eq('question_id', questionId)
      .eq('user_identifier', userIdentifier);

    if (deleteError) throw deleteError;

    const { data: question, error: questionError } = await supabase
      .from('questions')
      .select('vote_count')
      .eq('id', questionId)
      .single();

    if (questionError) throw questionError;

    const { error: updateError } = await supabase
      .from('questions')
      .update({ vote_count: Math.max(0, question.vote_count - 1) })
      .eq('id', questionId);

    if (updateError) throw updateError;

    return { success: true };
  },

  async checkUserVote(questionId, userIdentifier) {
    const { data, error } = await supabase
      .from('votes')
      .select('id')
      .eq('question_id', questionId)
      .eq('user_identifier', userIdentifier)
      .maybeSingle();

    if (error) throw error;
    return !!data;
  },

  async getUserVotes(userIdentifier) {
    const { data, error } = await supabase
      .from('votes')
      .select('question_id')
      .eq('user_identifier', userIdentifier);

    if (error) throw error;
    return data.map((vote) => vote.question_id);
  },
};
